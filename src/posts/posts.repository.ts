import { RequestInit } from "node-fetch";
import fetch from "node-fetch"
import { Post } from "./post.entity";

export class PostsMicroRepository {
    protected endpoint = "https://api.m3o.com/v1/db"

    constructor(protected apiKey: string = process.env.MICRO_DB_API_KEY) {}

    createEntity(data: any) {
        const post = new Post()

        post.id = data.id
        post.title = data.title
        post.body = data.body
        post.userId = data.userId
        post.createdAt = data.createdAt
        post.updatedAt = data.updatedAt

        return post;
    }

    async request(resource: string, _options: any) {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            }
        }

        if (_options.body) {
            options.body = JSON.stringify(_options.body)
        }

        return await fetch(`${this.endpoint}/${resource}`, options)
            .then((response) => response.json())
    }

    async create(data) {
        data.createdAt = (new Date()).toUTCString()
        data.updatedAt = (new Date()).toUTCString()

        const response = await this.request('Create', {
            body: { record: { ...data }, table: 'Posts' },
        })

        return this.createEntity({ ...data, id: response.id })
    }

    async get(id) {
        const response = await this.request('Read', {
            body: { id, table: 'Posts' },
        })

        if (response?.records?.length <= 0) {
            return null
        }

        return this.createEntity(response?.records[0])
    }

    async getAll() {
        const response = await this.request('Read', {
            body: { table: 'Posts' },
        })

        return response?.records.map((r) => this.createEntity(r)) as Post[]
    }

    async update(id, data) {
        data.updatedAt = new Date()

        const response = await this.request('Update', {
            body: { record: { ...data, id }, table: 'Posts' },
        })

        return response?.code >= 400 ? false : true
    }

    async delete(id) {
        const response = await this.request('Delete', {
            body: { id, table: 'Posts' },
        })

        return response?.code >= 400 ? false : true
    }
}
