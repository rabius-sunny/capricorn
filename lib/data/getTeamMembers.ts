import teamData from '@/data/team.json';
import type { TeamMember } from '@/types';

export async function getTeamMembers(): Promise<TeamMember[]> {
  // TODO: Replace with Prisma query when DB is connected
  // return await prisma.teamMember.findMany({ orderBy: { order: 'asc' } })
  return (teamData as TeamMember[]).sort((a, b) => a.order - b.order);
}
