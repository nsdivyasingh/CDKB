import { supabase } from "../server";

export async function searchSimilarSolutions(
  embedding: number[],
  limit = 5
) {
  const { data, error } = await supabase.rpc(
    "match_solutions",
    {
      query_embedding: embedding,
      match_count: limit,
    }
  );

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
