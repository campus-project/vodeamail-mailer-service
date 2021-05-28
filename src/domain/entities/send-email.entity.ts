import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('send_emails')
export class SendEmail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  organization_id: string;

  @Column({ type: 'varchar' })
  from: string;

  @Column({ type: 'varchar', nullable: true })
  from_name?: string;

  @Column({ type: 'varchar' })
  to: string;

  @Column({ type: 'varchar', nullable: true })
  to_name?: string;

  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'text' })
  html: string;

  @Column({ type: 'tinyint', default: 0 })
  is_delivered: boolean;

  @Column({ type: 'tinyint', default: 0 })
  retry: number;

  @Column({ type: 'varchar', nullable: true })
  external_id?: string;

  @CreateDateColumn()
  created_at: string;
}
