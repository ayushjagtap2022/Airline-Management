class CrudService {
    constructor(repository) {
        this.repository = repository
    }
    async create(data) {
        try {
            const response = await this.repository.create(data)
            return response
        } catch (error) {
            console.log("something went wrong in crudRepository");
            throw error
        }
    }
    async get(id) {
        try {
            const response = await this.repository.findByPk(id)
            return response
        } catch (error) {
            console.log("something went wrong in crudRepository");
            throw error
        }
    }
    async getall() {
        try {
            const response = await this.repository.findAll()
            return response
        } catch (error) {
            console.log("something went wrong in crudRepository");
            throw error
        }
    }
    async destroy(modelId) {
        try {
            await this.repository.destroy(
                {
                    where: {
                        id: modelId
                    }
                }
            );
            return true;
        } catch (error) {
            console.log("something went wrong in crudRepository");
            throw error
        }
    }
    async update(data, modelId) {
        try {
            let response = await this.repository.update(data, {
                where: {
                    id: modelId
                }
            })
            return response;
        } catch (error) {
            console.log("something went wrong in crudRepository");
            throw error
        }
    }

}
module.exports = CrudService