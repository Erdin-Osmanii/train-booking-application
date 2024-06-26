import {
  AUTO_GENERATE_ATTRIBUTE_STRATEGY,
  Attribute,
  AutoGenerateAttribute,
  Entity,
  INDEX_TYPE,
} from '@typedorm/common';

@Entity({
  name: 'booking',
  primaryKey: {
    partitionKey: 'BOOKING#{{id}}',
    sortKey: 'BOOKING#{{id}}',
  },
  indexes: {
    GSI1: {
      partitionKey: 'BOOKING#USERID#{{userId}}',
      sortKey: 'BOOKING#ID#{{id}}',
      type: INDEX_TYPE.GSI,
    },
  },
})
export class Booking {
  @AutoGenerateAttribute({
    strategy: AUTO_GENERATE_ATTRIBUTE_STRATEGY.UUID4,
  })
  id: string;

  @Attribute()
  userId: string;

  @Attribute()
  trainName: string;

  @Attribute()
  departureTime: string;

  @Attribute()
  arrivalTime: string;

  @Attribute()
  origin: string;

  @Attribute()
  destination: string;

  createdAt: string;

  updatedAt: string;
}
