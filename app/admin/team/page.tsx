'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, Trash2, Plus, User } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { ImageUploader } from '@/components/admin/ImageUploader';
import { ConfirmDialog } from '@/components/admin/ConfirmDialog';
import { useAdminTeam } from '@/hooks/useAdminData';
import { TeamMemberSchema, type TeamMemberInput } from '@/lib/validations';
import type { TeamMember } from '@/types';
import { updateTeamMember } from '@/actions/admin/updateTeamMember';
import { deleteRecord } from '@/actions/admin/deleteRecord';

export default function TeamPage() {
  const { team, isLoading, mutate } = useAdminTeam();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TeamMemberInput>({
    resolver: zodResolver(TeamMemberSchema),
    defaultValues: { order: '', name: '', title: '', bio: '', photoUrl: '' }
  });

  function openAdd() {
    setEditingItem(null);
    form.reset({ order: '', name: '', title: '', bio: '', photoUrl: '' });
    setDialogOpen(true);
  }

  function openEdit(item: TeamMember) {
    setEditingItem(item);
    form.reset({
      order: String(item.order),
      name: item.name,
      title: item.title,
      bio: item.bio ?? '',
      photoUrl: item.photoUrl ?? ''
    });
    setDialogOpen(true);
  }

  function onSubmit(data: TeamMemberInput) {
    startTransition(async () => {
      const result = await updateTeamMember(data, editingItem?.id);
      if (result.success) {
        toast.success(
          editingItem ? 'Team member updated.' : 'Team member added.'
        );
        void mutate();
        setDialogOpen(false);
      } else {
        toast.error(result.errors?.formErrors[0] ?? 'Failed to save.');
      }
    });
  }

  function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteRecord(id, 'teamMember');
      if (result.success) {
        toast.success('Team member deleted.');
        void mutate();
      } else {
        toast.error('Failed to delete.');
      }
    });
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-text-dark'>Team Members</h1>
        <Button
          onClick={openAdd}
          className='bg-teal text-white hover:bg-teal/90'
        >
          <Plus className='mr-2 h-4 w-4' />
          Add Team Member
        </Button>
      </div>

      {isLoading ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className='h-48 rounded-2xl'
            />
          ))}
        </div>
      ) : team.length === 0 ? (
        <div className='bg-white rounded-2xl p-12 shadow-card text-center'>
          <p className='text-sm text-text-mid'>No team members yet.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {team.map((member) => (
            <div
              key={member.id}
              className='bg-white rounded-2xl p-6 shadow-card'
            >
              <div className='flex items-start gap-4'>
                <div className='relative size-12 rounded-full overflow-hidden bg-surface-soft shrink-0'>
                  {member.photoUrl ? (
                    <Image
                      src={member.photoUrl}
                      alt={member.name}
                      fill
                      className='object-cover'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-full'>
                      <User className='size-6 text-text-mid' />
                    </div>
                  )}
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='font-semibold text-text-dark text-sm'>
                    {member.name}
                  </p>
                  <p className='text-xs text-teal'>{member.title}</p>
                  {member.bio && (
                    <p className='text-xs text-text-mid mt-1 line-clamp-2'>
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
              <div className='flex items-center gap-2 mt-4 pt-4 border-t border-gray-100'>
                <Button
                  variant='outline'
                  size='sm'
                  className='flex-1'
                  onClick={() => openEdit(member)}
                >
                  <Pencil className='mr-1.5 h-3.5 w-3.5' />
                  Edit
                </Button>
                <ConfirmDialog
                  title='Delete Team Member'
                  description='Are you sure you want to remove this team member?'
                  onConfirm={() => handleDelete(member.id)}
                  trigger={
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-destructive hover:text-destructive hover:bg-destructive/10'
                    >
                      <Trash2 className='size-4' />
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogContent className='sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle>
              {editingItem ? 'Edit Team Member' : 'Add Team Member'}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 mt-2'
            >
              <FormField
                control={form.control}
                name='order'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='title'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Registered Nurse, Administrator…'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='bio'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='photoUrl'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo (optional)</FormLabel>
                    <FormControl>
                      <ImageUploader
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-end gap-2 pt-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type='submit'
                  disabled={isPending}
                  className='bg-teal text-white hover:bg-teal/90'
                >
                  {isPending && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
