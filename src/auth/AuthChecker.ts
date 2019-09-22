import { ResolverData } from '../auth/ResolverData';

export type AuthChecker<ContextType = {}, RoleType = string> = (
  resolverData: ResolverData<ContextType>,
  roles: RoleType[] // ,
) => boolean | Promise<boolean>;

export type AuthMode = 'error' | 'null';
