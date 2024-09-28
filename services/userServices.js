module.exports = function(appInstance) {
    async function getList(qs) {
        return await paginate({
            page: parseInt(qs.page),
            perPage: parseInt(qs.perPage),
            q : qs.q ? String(qs.q).trim() : null
        })
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

    //create function paginate
    async function paginate({
        page, 
        perPage, 
        q,
    }) {
        console.log(page, perPage, q)
        try {
            //get total value
            const {total} = await tableName()
            .where((query)=>{
                if(q) {
                    query.whereILike("name", `%${q}%`).orWhereILike("email", `%${q}%`)
                }
            })
            .count("id as total")
            .first()

            //  get current page
            const currentPage = Math.min(page, perPage)
            const offset = (currentPage - 1) * perPage
            const lastPage = Math.ceil(total / perPage)
            
            //data object
            const data  = await tableName()
            .where((query)=>{
                if(q) {
                    query.whereILike("name", `%${q}%`).orWhereILike("email", `%${q}%`)
                }
            })
            .select("*")
            .limit(perPage)
            .offset(offset) 
            return {data, total, currentPage, offset, lastPage, firstPage: 1, q}
        } catch (error) {
            
        }
        return {
            total,
            currentPage,
            offset,
            lastPage,
            firstPage: 1,
            q
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