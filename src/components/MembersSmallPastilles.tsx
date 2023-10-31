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

const MembersSmallPastilles = ({ members }: Props) => {
  const getInitials = (first: string | null, last: string | null) => {
    const firstName = first ? first[0].toUpperCase() : "";
    const lastName = last ? last[0].toUpperCase() : "";
    return firstName + lastName;
  };

  const membersImg =
    members &&
    members.map((member) => (
      <>
        <div className="flex justify-center items-center bg-[#ff54169d] text-center p-2 h-6 w-6 rounded-full">
          <span className="text-xs font-semibold text-black">
            {getInitials(member.user.firstname, member.user.lastname)}
          </span>
        </div>
      </>
    ));
  return (
    <div className="flex gap-2 justify-end items-center w-fit">
      {membersImg}
    </div>
  );
};

export default MembersSmallPastilles;
