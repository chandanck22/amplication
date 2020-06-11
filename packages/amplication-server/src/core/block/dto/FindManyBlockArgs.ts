import { ArgsType, Field, Int } from '@nestjs/graphql';
import { BlockOrderByInput, BlockWhereInput } from './';

@ArgsType()
export class FindManyBlockArgs {
  @Field(() => BlockWhereInput, { nullable: true })
  where?: BlockWhereInput | null;

  @Field(() => BlockOrderByInput, { nullable: true })
  orderBy?: BlockOrderByInput | null;

  @Field(() => Int, { nullable: true })
  skip?: number | null;

  @Field(() => Int, { nullable: true })
  take?: number | null;
}
