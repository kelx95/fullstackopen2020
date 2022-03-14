import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR_BIRTH, ALL_AUTHORS } from "../queries";

const EditAuthorBirth = () => {
  const [authorName, setAuthorName] = useState("");
  const [birth, setBirth] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    if (authorName !== "" && birth !== "") {
      updateAuthor({
        variables: { name: authorName, setBornTo: parseInt(birth, 10) },
      });
    }
    setAuthorName("");
    setBirth("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
        name
          <input
            value={authorName}
            onChange={({ target }) => setAuthorName(target.value)}
          />
        </div>
        <div>
        born
          <input
            value={birth}
            onChange={({ target }) => setBirth(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default EditAuthorBirth;
