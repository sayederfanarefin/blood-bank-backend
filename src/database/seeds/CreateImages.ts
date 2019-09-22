import * as fs from 'fs';
import * as path from 'path';
import { Factory, Seed } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Image } from '../../api/models/Image';

import uuid = require('uuid');

let imageRepository ;
const identifiers: StaticIdentifier[] = [
    { dir: '../../public/badges/' , tag: 'badge'},
    { dir: '../../public/caricons/tesla/models/' , tag: 'tesla-model-s'},
    { dir: '../../public/caricons/tesla/modelx/' , tag: 'tesla-model-x'},
];
export class CreateImages implements Seed {

    public async seed(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        imageRepository = em.getRepository(Image);

        for (const identifier of identifiers) {
            this.imageOperation(identifier.dir, identifier.tag);
        }
    }
    private async imageOperation( dir: string, subTag: string ): Promise <void> {
        try {
            const data = fs.readdirSync( path.join(__dirname, dir) );
            const files: string[] = data as string[];
            for (const file of files) {
                const splitted = file.split('.', 2);
                const pathFromDir = dir.split('public/', 2);
                const image = new Image();
                image.id = uuid.v4();
                image.tag = subTag;
                image.subtag = splitted[0].toLowerCase();
                image.url = pathFromDir[1] + file;
                await imageRepository.save(image);
                console.log(image);
            }

          } catch ( err ) {
            console.error(err);
          }
    }

}

export interface StaticIdentifier {
    dir: string;
    tag: string;
}
