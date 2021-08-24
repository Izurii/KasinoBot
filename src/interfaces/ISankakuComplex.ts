export type IChanToken = {
	_sankakucomplex_session: string,
	blacklisted_tags: string,
	locale: string,
	login: string,
	pass_hash: string,
	v: string
}

export type ISankakuComplexData = {
	id: number,
	rating: string,
	status: string | undefined,
	author: {
		id: number,
		name: string,
		avatar: string,
		avatar_rating: string
	},
	sample_url: string,
	sample_width: number,
	sample_height: number,
	preview_url: string,
	preview_width: number,
	preview_height: number,
	file_url: string,
	width: number,
	height: number,
	file_size: number,
	file_type: string,
	created_at: {
		json_class: string,
		s: number,
		n: number
	},
	has_children: boolean,
	has_comments: boolean,
	has_notes: boolean,
	is_favorited: boolean,
	user_vote: null,
	md5: string,
	parent_id: null,
	change: number,
	fav_count: number,
	recommended_posts: number,
	recommended_score: number,
	vote_count: number,
	total_score: number,
	comment_count: null,
	source: string,
	in_visible_pool: boolean,
	is_premium: boolean,
	is_rating_locked: boolean,
	redirect_to_signup: boolean,
	sequence: null,
	tags: Array<{
		id: number,
		name_en: string,
		name_ja: string,
		type: number,
		count: number,
		post_count: number,
		pool_count: number,
		locale: string,
		rating: string,
		name: string
	}>
}