import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'nest-mlops-api',
  entities: [User],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('DB Connect Success!!');
  })
  .catch((error) => console.log(error));
