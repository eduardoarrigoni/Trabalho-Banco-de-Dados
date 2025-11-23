import { Pool } from 'pg';
async function connectDataBase() {
    if (global.connection)
        return global.connection.connect();
    
    
    const pool = new Pool({
        user: "avnadmin",
        password: "AVNS_qW_9_HlybjislZ9Ziuc",
        host: "pg-ce9ee9c-bobyhrg-04ee.e.aivencloud.com",
        port: 18088,
        database: "defaultdb",
        ssl: {
        rejectUnauthorized: true,
        ca: "-----BEGIN CERTIFICATE-----\nMIIEUDCCArigAwIBAgIUeGL7e22dQN8otH526/D0JaPI1CowDQYJKoZIhvcNAQEM\nBQAwQDE+MDwGA1UEAww1MTNiNDJlYjgtMzVlNi00MDY0LThlMWItZjA2MjliMGU0\nODI4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUxMDAzMTMxMDU3WhcNMzUxMDAxMTMx\nMDU3WjBAMT4wPAYDVQQDDDUxM2I0MmViOC0zNWU2LTQwNjQtOGUxYi1mMDYyOWIw\nZTQ4MjggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC\nAYoCggGBAPPQIwrfFHmzh+GYMN30BlerpcEmo7Nnal7ejjxiHph1fcKzBYWrGhIf\n8eekDcFv68nZufW//PxpvP7P+B7PvxvORX9LVD9Paqj4ftwmHifgV1u8LUVg3KGx\nz3m4wmdoTsUur5kKWK3BqUFi1Wo5niG6h/yYia45wD2Ak2/WEoCVThiX6NDODchf\nkrzbhUGpx6fUlxG3Fl3f1pm9Xfz3mU2l2gPocoOYmy+7Zgede3nCzC6NqjuoKViP\nVndHO1hb4Do6R3zZ32GHW+RLURZJn7dCXFpOSzrPWYP7K682RO4YurJb6BAeOgf4\nHo7Lx6qfW9DvOf9q1cCiOm/Xm4ZBKytUXZ3INUuzuyPMyqHgyWI7Fi7VkNPBNfl2\nqQZK9JdadqYQ007bUC2PegmMIGfSdDgxb9j1vsExb13lBcJk4vGQKsyl65GSfHoF\nkAuTqZQUu0JRUj8QkzeAbxyggANVXdv1pxFesMVIrfBAnOkC1D0kwdgQst9OM7v4\nVEIff1q52wIDAQABo0IwQDAdBgNVHQ4EFgQUF/MTAkN/yhAeig5CtMJunbqmITYw\nEgYDVR0TAQH/BAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQAD\nggGBANfc4okQFjNbxFYo64h9HbgLTeMrtrzScB9EoMVf4orvi+eqh4SL59iu5jye\nP7hP3b3QC5pMju+FgmyVIzkthYBGwZ4t3DJGgEmd3QQGK/X6wQub44Ii5entlMcJ\nI1X+o6zO5xzni/grFhfGIJ30JNKcQoJFZ+RyJvgi9r0boqsqTYY7Euj339G5ASOe\n1P+Im/cNZ/m5jndGLJeUfVa/j6yUcqY9DFRG0n61C77nGEu87dJiQBduzky8oYUr\nKR3NvSCpQWp401ZNNn9XaTxAqMKBDDSyHJxDp1RvUml9AakvDBAs1V4tgiCiaLDR\nOCeoLHulbUT1572FI5qAI6hfa+ngM54s7CtKGns4tClwvOqKN1kLa5+sJ3jvU9qt\nPsVH/NuuGzxated9HG6Fp7VI+5OyaTm7zJDnROfqE36/69yphSU5YlDds79cQw8D\n593xm4zKQ8FLL3vVDj+veuj8UQbnODZt4TjcXB/6iJjoscMOeNLqhJH6AbirbHsJ\ngZz3Mw==\n-----END CERTIFICATE-----",
        }
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

connectDataBase();
export default connectDataBase;


