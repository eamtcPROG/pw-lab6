import { ResourceContext } from 'providers/ResourceProvider';
import { useContext } from 'react';


export  const useResource = () => {
    return useContext(ResourceContext);
}
