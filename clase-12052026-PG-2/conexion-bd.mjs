import {Pool} from 'pg'

const bdConfig = {
    host: 'localhost',
    database: 'tienda',
    user: 'root',
    password: 'pass',
    port: 5432
}

const pg = new Pool(bdConfig)

export default pg