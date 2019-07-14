import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class JwtGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
