module.exports = function(appInstance) {
    async function getList() {
       return await tableName().select("*")
    }
    async function create({name, email, status}) {
        try {
            const [user] = await tableName().insert({name, email, status})
            return await tableName().select("*").where({id: user})
        } catch (error) {
            return throwError(error)
        }
    }

    async function findById(id) {
        try {
            return await tableName().select("*").where({id}).first()
        } catch (error) {
            return throwError(error)
        }
    }
    async function update({name, email, status}, id) {
        try {
            const userExist = await findById(id)
            if(!userExist) {
                return throwError("user not found")
            }
            return await tableName().update({name, email, status}).where({id})
        } catch (error) {
            throwError(error)
        }
    }
    
    async function destroy(id) {
        try {
            const userExist = await findById(id)
            if(!userExist) {
                return throwError("user not found")
            }
            return await tableName().delete().where({id})
        } catch (error) {
            throwError(error)
        }
    }

    function tableName() {
        return appInstance.db("users");
    }

    function throwError(message) {
        throw new Error(message);
    }
      
    return {getList, create, update, findById, destroy}
}