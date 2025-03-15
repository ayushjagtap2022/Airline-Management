class CrudRepository {
    constructor(model) {
        console.log(model);
        this.model = model
    }
    async create(data) {
        try {
            let response = await this.model.create(data);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async destroy(modelId) {
        try {
            await this.model.destroy(
                {
                    where: {
                        id: modelId
                    }
                }
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async get(modelId) {
        try {
            let response = await this.model.findByPk(modelId);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            let response = await this.model.findAll()
            return response;
        } catch (error) {
            throw error;
        }
    }

    async update(modelId, data) {
        try {
            let response = await this.model.update(data, {
                where: {
                    id: modelId
                }
            })
            return response;
        } catch (error) {
            throw error;
        }
    }

}
module.exports = CrudRepository