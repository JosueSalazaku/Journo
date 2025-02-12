export interface User {
	id: string;
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Post {
	id: string;
	title: string;
	content: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Session {
	id: string;
	expiresAt: Date;
	ipAddress?: string;
	userAgent?: string;
	userId: string;
}

export interface Account {
	id: string;
	accountId: string;
	providerId: string;
	userId: string;
	accessToken?: string;
	refreshToken?: string;
	idToken?: string;
	expiresAt?: Date;
	password?: string;
}

export interface Verification {
	id: string;
	identifier: string;
	value: string;
	expiresAt: Date;
	createdAt?: Date;
}

