import { z } from 'zod'

export const MovieSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  length: z.string(),
  trailer: z.string(),
  movie: z.string(),
  image: z.string(),
})

export type Movie = z.infer<typeof MovieSchema>

export const MovieWithImageSchema = MovieSchema.extend({
  imageUrl: z.string(),
})

export type MovieWithImage = z.infer<typeof MovieWithImageSchema>

export const MovieWithMovieImageSchema = MovieWithImageSchema.extend({
  movieUrl: z.string(),
})

export type MovieWithMovieImage = z.infer<typeof MovieWithMovieImageSchema>

export const MovieWithTrailerImageSchema = MovieWithImageSchema.extend({
  trailerUrl: z.string(),
})

export type MovieWithTrailerImage = z.infer<typeof MovieWithTrailerImageSchema>

export const DataSchema = z.array(MovieSchema)

export type Data = z.infer<typeof DataSchema>

export const ResponseSchema = z.object({
  data: DataSchema,
})

export type Response = z.infer<typeof ResponseSchema>

export const SingleResponseSchema = z.object({
  data: MovieSchema,
})

export type SingleResponse = z.infer<typeof SingleResponseSchema>