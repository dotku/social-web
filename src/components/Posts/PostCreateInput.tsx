"use client";

import { gql, useMutation } from "@apollo/client";
import { Button, Input, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { allPostQueryDocument } from "./PostList";

// Define the GraphQL mutation
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($content: String!) {
    insertIntopostsCollection(objects: { content: $content }) {
      records {
        content
        created_at
      }
    }
  }
`;

export default function PostCreatInput() {
  const [postContent, setPostContent] = useState("");

  const [createPost, { data, loading, error }] = useMutation(
    CREATE_POST_MUTATION,
    {
      refetchQueries: [{ query: allPostQueryDocument }], // Refetch post list
      awaitRefetchQueries: true, // Wait for refetch to complete
      variables: { content: postContent },
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostContent(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await createPost();
      console.log("Post created successfully:", data);
      setPostContent(""); // Clear input after post is created
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div>
      <Textarea
        value={postContent}
        disabled={loading}
        variant="faded"
        placeholder="What's on your mind?"
        description="Hint: share whatever you want to talk about anonymously! (We don't care if you are a bot 🤖️...)"
        onChange={handleInputChange}
        required
      />
      <div className="flex justify-between">
        <div>{error && <p>Error creating post: {error.message}</p>}</div>
        <Button onClick={handleSubmit} disabled={loading} color="primary">
          {loading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
}
