import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_AUTHOR_BIRTH, ALL_AUTHORS } from "../queries";
import Select from "react-select";

const EditAuthorBirth = ( { authors }) => {
  const [authorName, setAuthorName] = useState(null);
  const [birth, setBirth] = useState("");
  const [updateAuthor] = useMutation(UPDATE_AUTHOR_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    if (authorName !== "" && birth !== "") {
      updateAuthor({
        variables: { name: authorName.value, setBornTo: parseInt(birth, 10) },
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
          <Select
            defaultValue={authorName}
            onChange={setAuthorName}
            options={authors}
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
