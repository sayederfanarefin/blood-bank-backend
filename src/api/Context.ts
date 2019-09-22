import express from 'express';
import { ContainerInstance } from 'typedi';

// import { User } from '../api/user.interface';

export interface Context {
    requestId: string;
    request: express.Request;
    response: express.Response;
    container: ContainerInstance;
    userId: string;
}
