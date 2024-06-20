import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
  INDEX_TYPE,
  Table,
} from '@typedorm/common';
import { BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'user', // name of the entity that will be added to each item as an attribute
  // primary key
  primaryKey: {
    partitionKey: 'USER#{{id}}',
    sortKey: 'USER#{{id}}',
  },
  indexes: {
    // specify GSI1 key - "GSI1" named global secondary index needs to exist in above table declaration
    GSI1: {
      partitionKey: 'USER#{{id}}',
      sortKey: 'USER#{{id}}',
      type: INDEX_TYPE.GSI,
    },
  },
})
export class User {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  name: string;

  @Attribute()
  email: string;

  @Attribute()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  createdAt: string;

  updatedAt: string;
}
