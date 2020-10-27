import Post from '../entities/Post'
import { MyContext } from 'src/types'
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql'

@Resolver(Post)
export default class PostResolver {
  @Query(() => [Post])
  posts (
    @Ctx() ctx: MyContext
  ): Promise<Post[]> {
    return ctx.em.find(Post, {})
  }

  @Query(() => Post, { nullable: true })
  post (
    @Ctx() ctx: MyContext, @Arg('id') id: number
  ): Promise<Post | null> {
    return ctx.em.findOne(Post, { id })
  }

  @Mutation(() => Post)
  async createPost (
    @Ctx() ctx: MyContext,
    @Arg('title') title: string
  ): Promise<Post> {
    const post = ctx.em.create(Post, { title })
    await ctx.em.persistAndFlush(post)
    return post
  }

  @Mutation(() => Post, { nullable: true })
  async updatePost (
    @Ctx() ctx: MyContext,
    @Arg('id') id: number,
    @Arg('title') title: string
  ): Promise<Post | null> {
    const post = await ctx.em.findOne(Post, { id })
    if (!post) {
      return null
    }

    post.title = title
    await ctx.em.persistAndFlush(post)
    return post
  }

  @Mutation(() => Boolean)
  async deletePost (
    @Ctx() ctx: MyContext,
    @Arg('id') id: number
  ): Promise<boolean> {
    try {
      await ctx.em.nativeDelete(Post, { id })
      return true
    } catch {
      return false
    }
  }
}
