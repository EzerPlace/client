/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import systemStore from '../../store/SystemStore';
import { System } from '../../utils/System';

export const SystemHeader = () => {

    const [currentSystem, setCurrentSystem] = useState<System | null>(null)

    const { systemUrl } = useParams();

    useEffect(() => {
        const getSystemByUrlName = async () => {
            await systemStore.getSystemByUrlName(systemUrl);
            setCurrentSystem(systemStore.currentSystem)
        }

        getSystemByUrlName();
    }, [])

    return (
        <div>
                <h1>{currentSystem?.topic || 'no system'}</h1>
                <h4>{currentSystem?.description || 'no system'}</h4>
        </div>
    )
}