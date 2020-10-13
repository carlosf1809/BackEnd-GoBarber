import User from '../models/User';

export default class UserMap {
	public static toDTO(user: User): Omit<User, 'password'> {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.avatar,
			created_at: user.created_at,
			updated_at: user.updated_at,
        }
    }
};
