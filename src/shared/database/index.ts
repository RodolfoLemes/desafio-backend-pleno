import CreateFirstAdminService from '@modules/users/services/CreateFirstAdminService';
import { container } from 'tsyringe';
import { createConnections } from 'typeorm';

const connect = async (): Promise<void> => {
  try {
    await createConnections();
  } catch (err) {
    console.error('ERROR when trying to create a connection:');
    console.error(err);
    process.exit(1);
  }

  try {
    const createFirstAdmin = container.resolve(CreateFirstAdminService);

    await createFirstAdmin.execute();
  } catch (err) {
    console.error(`ERROR when trying to create admin user:`);
    console.error(err);
    process.exit(1);
  }
};

connect();
