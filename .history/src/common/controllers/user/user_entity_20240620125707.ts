import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
  INDEX_TYPE,
  Table,
} from '@typedorm/common';
import * as bcrypt from 'bcrypt';

@Entity({
  name: 'user',
  primaryKey: {
    partitionKey: 'USER#{{id}}',
    sortKey: 'USER#{{id}}',
  },
  indexes: {
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

  createdAt: string;

  updatedAt: string;
}
