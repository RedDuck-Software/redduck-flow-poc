import { type Edge, type Node } from 'reactflow';
import { type Address } from 'viem';

export interface Flow {
  author: Address;
  id: string;
  title: string;
  description: string;
  updatedAt: number;
  sandbox: {
    nodes: Node[];
    edges: Edge[];
  };
}
