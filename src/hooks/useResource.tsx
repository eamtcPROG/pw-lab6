import { useContext } from 'react';
import { ResourceContext } from 'providers/ResourceProvider';

export  const useResource = () => {
    return useContext(ResourceContext);
}
