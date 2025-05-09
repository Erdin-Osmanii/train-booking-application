import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
  INDEX_TYPE,
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
      partitionKey: 'USER#EMAIL#{{email}}',
      sortKey: 'USER#ID#{{id}}',
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

  @Attribute({
    unique: true,
  })
  email: string;

  @Attribute()
  password: string;

  createdAt: string;

  updatedAt: string;

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    return password;
  }

  async comparePassword(plainTextPassword, hashedPassword) {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  }
}
