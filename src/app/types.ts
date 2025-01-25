export type WorkspaceResponse = {
   status: number;
   data?: {
     subscription: {
       plan: 'PRO' | 'FREE';
     } | null;
     workspace: {
       id: string;
       name: string;
       type: 'PERSONAL' | 'PUBLIC';
     }[];
     members: {
       WorkSpace: {
         id: string;
         name: string;
         type: 'PERSONAL' | 'PUBLIC';
       } | null;
     }[];
   };
 }
