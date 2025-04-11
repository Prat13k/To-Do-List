import  type {Config} from 'drizzle-kit';

export default{
	schema : '/src/lib/db/schema.ts',
	out : './src/lib/db/migrations',
	driver : 'better-sqlite3',
	dbCredentials : {
		url : './drizzle/tusk.db'
	}
}satisfies Config;