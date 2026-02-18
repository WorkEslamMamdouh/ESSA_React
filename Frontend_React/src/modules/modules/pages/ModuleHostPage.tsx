import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { moduleRouteRegistry } from '@/modules/modules/moduleRegistry';

export const ModuleHostPage = () => {
  const { moduleCode } = useParams<{ moduleCode: string }>();

  const moduleDefinition = useMemo(() => {
    if (!moduleCode) {
      return null;
    }

    return moduleRouteRegistry.find(
      (entry) => entry.moduleCode.toLowerCase() === moduleCode.toLowerCase()
    );
  }, [moduleCode]);

  return (
    <section>
      <h1>Module Host</h1>
      <p>
        Module code: <strong>{moduleCode ?? 'N/A'}</strong>
      </p>
      {moduleDefinition ? (
        <p>Mapped module: {moduleDefinition.title}</p>
      ) : (
        <p>No module mapping yet. This route remains available for incremental migration.</p>
      )}
    </section>
  );
};
