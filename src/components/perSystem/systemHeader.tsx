/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import systemStore from '../../store/SystemStore';

export const SystemHeader = () => {

    const { systemUrl } = useParams();

    useEffect(() => {
        const getSystemByUrlName = async () => {
            await systemStore.getSystemByUrlName(systemUrl);
        }

        getSystemByUrlName();
    }, [])

    return (
        <div>
                <h1>{systemStore.currentSystem?.topic || 'no system'}</h1>
                <h4>{systemStore.currentSystem?.description || 'no system'}</h4>
        </div>
    )
}