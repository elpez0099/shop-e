class BaseRepository{
    constructor(model){
        this._model = model
    }

    async get(filters){
        return await this._model.find(filters);
    }

    async getById(id){
        return await this._model.findById(id);
    }

    async create(entity){
        return await this._model.create(entity);
    }

    async update(id, entity){
        return await this._model.findByIdAndUpdate(id, entity, {new: true});
    }

    async delete(id){
        return await this._model.findByIdAndDelete(id);
    }
}

export default BaseRepository;