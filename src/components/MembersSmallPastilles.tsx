"use client";

interface Props {
  members: {
    userId: string;
    user: {
      id: string;
      email: string;
      firstname: string | null;
      lastname: string | null;
      picturelink: string | null;
      colorSchema: string;
    };
    projectId: string;
    id: number;
  }[];
}

const MembersSmallPastilles = ({}: Props) => {
  return <div>Members</div>;
};

export default MembersSmallPastilles;
