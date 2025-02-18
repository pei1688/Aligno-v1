"use client";

import { useEffect, useState } from "react";
import CardModal from "../modals/CardModal";
import PremiumModal from "../modals/PremiumModal";
import CreateWorkspaceModal from "../modals/CreateWorkspaceModal";
import DeleteWorkspaceModal from "../modals/DeleteWorkspace";

//延遲掛載 需要時才渲染
const CardModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <CardModal />
      <PremiumModal />
      <CreateWorkspaceModal />
      <DeleteWorkspaceModal />
    </>
  );
};

export default CardModalProvider;
