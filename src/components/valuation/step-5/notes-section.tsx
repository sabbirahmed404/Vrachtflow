"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { FormSection } from "@/components/valuation/form-section"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Lock, Users, UserCircle, MessageSquare, AlertCircle, Eye } from "lucide-react"

type NoteVisibility = "internal" | "staff" | "customer"

interface Note {
  id: string
  content: string
  visibility: NoteVisibility
  createdAt: Date
}

const visibilityConfig: Record<
  NoteVisibility,
  {
    label: string
    description: string
    icon: typeof Lock
    color: string
    bgColor: string
  }
> = {
  internal: {
    label: "Internal",
    description: "Only visible to office staff",
    icon: Lock,
    color: "text-amber-700",
    bgColor: "bg-amber-100",
  },
  staff: {
    label: "Staff",
    description: "Visible to movers and office staff",
    icon: Users,
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  customer: {
    label: "Customer",
    description: "Visible to everyone including customer",
    icon: UserCircle,
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
}

export function NotesSection() {
  const [notes, setNotes] = useState<Note[]>([])
  const [newNoteContent, setNewNoteContent] = useState("")
  const [selectedVisibility, setSelectedVisibility] = useState<NoteVisibility>("internal")

  const addNote = () => {
    if (!newNoteContent.trim()) return

    const newNote: Note = {
      id: crypto.randomUUID(),
      content: newNoteContent.trim(),
      visibility: selectedVisibility,
      createdAt: new Date(),
    }

    setNotes([...notes, newNote])
    setNewNoteContent("")
  }

  const removeNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
  }

  const getVisibilityIcon = (visibility: NoteVisibility) => {
    const Icon = visibilityConfig[visibility].icon
    return <Icon className="h-3.5 w-3.5" />
  }

  return (
    <FormSection title="Notes & Preferences">
      <div className="space-y-6">
        {/* Add New Note */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span className="text-sm font-medium">Add a new note</span>
          </div>

          {/* Visibility Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Who can see this note?</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(Object.keys(visibilityConfig) as NoteVisibility[]).map((visibility) => {
                const config = visibilityConfig[visibility]
                const Icon = config.icon
                const isSelected = selectedVisibility === visibility

                return (
                  <button
                    key={visibility}
                    type="button"
                    onClick={() => setSelectedVisibility(visibility)}
                    className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-1.5 rounded-lg ${config.bgColor}`}>
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>
                      <span className="font-medium text-foreground">{config.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{config.description}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Note Content */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Note Content</Label>
            <Textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Enter your note here... (e.g., Customer has fragile china cabinet, No parking at destination)"
              rows={3}
              className="bg-card resize-none"
            />
          </div>

          <Button type="button" onClick={addNote} disabled={!newNoteContent.trim()} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Note
          </Button>
        </div>

        {/* Notes List */}
        {notes.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Added Notes ({notes.length})</h3>
            </div>

            <div className="space-y-3">
              {notes.map((note) => {
                const config = visibilityConfig[note.visibility]
                const Icon = config.icon

                return (
                  <div key={note.id} className="flex items-start gap-3 p-4 border border-border rounded-xl bg-card">
                    <div className={`p-2 rounded-lg ${config.bgColor} shrink-0`}>
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary" className={`${config.bgColor} ${config.color} border-0`}>
                          {config.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {note.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{note.content}</p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                      onClick={() => removeNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border rounded-xl">
            <div className="p-3 rounded-full bg-muted mb-3">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-1">No notes added yet</p>
            <p className="text-sm text-muted-foreground">Add notes for the moving team, office staff, or customer</p>
          </div>
        )}

        {/* Info Box */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <AlertCircle className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-900">Visibility Guide</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5" />
                <strong>Internal:</strong> Only office staff can see these notes
              </li>
              <li className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5" />
                <strong>Staff:</strong> Movers and office staff can see these notes
              </li>
              <li className="flex items-center gap-2">
                <Eye className="h-3.5 w-3.5" />
                <strong>Customer:</strong> Everyone including the customer can see these notes
              </li>
            </ul>
          </div>
        </div>
      </div>
    </FormSection>
  )
}
