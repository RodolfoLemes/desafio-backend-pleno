import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Admin from './Admin';
import Manager from './Manager';

import Signer from './Signer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  username: string;

  @OneToOne(() => Signer, signer => signer.user, {
    eager: true,
    cascade: true,
  })
  signer?: Signer;

  @OneToOne(() => Manager, manager => manager.user, {
    eager: true,
    cascade: true,
  })
  manager?: Manager;

  @OneToOne(() => Admin, admin => admin.user, {
    eager: true,
    cascade: true,
  })
  admin?: Admin;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export default User;
