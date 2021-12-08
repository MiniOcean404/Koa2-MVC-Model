import { Entity, Column } from 'typeorm'

@Entity()
export class Photo {
	@Column()
	id: number | undefined

	@Column()
	name: string | undefined

	@Column()
	description: string | undefined

	@Column()
	filename: string | undefined

	@Column()
	views: number | undefined

	@Column()
	isPublished: boolean | undefined
}
