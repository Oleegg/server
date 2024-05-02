import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { get } from 'lodash';
import { DataSource, DataSourceOptions } from 'typeorm';

const YAML_CONFIG_FILENAME = 'conf/local.yaml';

const createOrmConfigSource = (options?: object): DataSourceOptions => {
  const environmentConfig = () => {
    const config = yaml.load(
      readFileSync(join(YAML_CONFIG_FILENAME), 'utf8'),
    ) as Record<string, any>;
    return get({ ...config }, 'db.postgres', {});
  };

  return {
    ...environmentConfig(),
    type: 'postgres',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'migrations',
    ...options,
  };
};

export const ormConfig = createOrmConfigSource({
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
});
export const ormConnectionConfig = createOrmConfigSource();

export default new DataSource(ormConfig);
