import app from "./app";
import {setupDb} from './config/db_config';

setupDb().then(() => {
    console.log('Database initialized');
    app.listen(app.get("port"), () => {
        console.log(`App is running on port:${app.get('port')} in env:${app.get('env')}`);
    });
});