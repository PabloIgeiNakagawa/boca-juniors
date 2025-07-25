import { useCompetitionInfo } from '../hooks/useCompetitionInfo';

type titulo = {
    number: string
    name: string
    id: string
    additionalData: {
      competitionId: string
      competitionTypeId: string
      cycle: string | null
      seasonIds: string[]
    }
}

export function TituloCard({ t }: { t: titulo }) {
  const competitionInfo = useCompetitionInfo(t.additionalData.competitionId);

  if (!competitionInfo) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <span className="font-semibold">{t.name}</span> - {t.number} títulos - Temporadas: {t.additionalData.seasonIds.join(', ')}
      <div>
        <strong>Detalles de la Competencia:</strong>
        <div>Nombre: {competitionInfo.competition?.competition.competitionName}</div>
        <img
          src={competitionInfo.competition?.competition.trophy}
          alt={competitionInfo.competition?.competition.competitionName}
          className="h-10 w-10"
        />
      </div>
    </div>
  );
}
