import React, { useState } from "react";
import Knowledge from "../components/Knowledge-Center/Knowledge";
import Container from "../components/Container";
const KnowledgeCenter = () => {
  return (
    <div
      className="bg-white "
     
    >
      <div>
        <Container>
          <Knowledge />
        </Container>
      </div>
    </div>
  );
};

export default KnowledgeCenter;
