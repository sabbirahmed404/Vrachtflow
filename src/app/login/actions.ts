'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const username = formData.get('username') as string
    const password = formData.get('password') as string

    // 1. Check if user exists in our valid users table and get their email
    const { data: userRecord, error: dbError } = await supabase
        .from('app_users') // Check table name from previous steps, confirmed 'app_users'
        .select('email')
        .eq('username', username)
        .single()

    if (dbError || !userRecord) {
        console.error('User lookup failed:', dbError)
        // Return error or redirect with error param
        return redirect('/login?error=Invalid credentials')
    }

    // 2. Authenticate with Supabase Auth using the email
    const { error: authError } = await supabase.auth.signInWithPassword({
        email: userRecord.email,
        password,
    })

    if (authError) {
        console.error('Auth failed:', authError)
        return redirect('/login?error=Authentication failed')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
