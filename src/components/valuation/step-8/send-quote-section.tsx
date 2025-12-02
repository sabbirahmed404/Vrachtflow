"use client";

import { useState } from "react";
import { FormSection } from "@/components/valuation/form-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Send,
  Save,
  Mail,
  FileText,
  Clock,
  Check,
  AlertCircle,
  Download,
  Printer,
  User,
  Calendar,
  Euro,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// Simulated data
const quoteData = {
  quoteNumber: "QT-2024-0847",
  customerName: "Jan de Vries",
  customerEmail: "jan.devries@email.nl",
  totalAmount: 1458.45,
  validUntil: "2024-02-15",
};

export function SendQuoteSection() {
  const [sendOption, setSendOption] = useState<"send" | "save" | null>(null);
  const [sendImmediately, setSendImmediately] = useState<boolean | null>(null);
  const [saveAsDraft, setSaveAsDraft] = useState<boolean | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [includeTerms, setIncludeTerms] = useState(true);
  const [includePdf, setIncludePdf] = useState(true);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [successType, setSuccessType] = useState<
    "sent" | "saved" | "scheduled"
  >("sent");

  const handleSendQuote = () => {
    setIsSending(true);
    // Simulate sending
    setTimeout(() => {
      setIsSending(false);
      setSuccessType("sent");
      setShowSuccessDialog(true);
    }, 1500);
  };

  const handleSaveDraft = () => {
    setIsSending(true);
    // Simulate saving
    setTimeout(() => {
      setIsSending(false);
      setSuccessType("saved");
      setShowSuccessDialog(true);
    }, 1000);
  };

  const handleScheduleSend = () => {
    setIsSending(true);
    // Simulate scheduling
    setTimeout(() => {
      setIsSending(false);
      setSuccessType("scheduled");
      setShowSuccessDialog(true);
    }, 1000);
  };

  return (
    <>
      <FormSection title="Quote Preview" showDivider>
        <Card className="border border-border bg-muted/30">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Quote Number</p>
                <p className="font-mono font-semibold text-foreground">
                  {quoteData.quoteNumber}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Printer className="h-4 w-4" />
                  Print
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 p-4 bg-background rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">
                    {quoteData.customerName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Euro className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-medium text-foreground">
                    €{quoteData.totalAmount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Valid Until</p>
                  <p className="font-medium text-foreground">
                    {quoteData.validUntil}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FormSection>

      <FormSection title="Do you want to send the quote?" showDivider>
        <RadioGroup
          value={sendOption || ""}
          onValueChange={(value) => {
            setSendOption(value as "send" | "save");
            setSendImmediately(null);
            setSaveAsDraft(null);
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Label
            htmlFor="send-yes"
            className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
              sendOption === "send"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
          >
            <RadioGroupItem value="send" id="send-yes" className="sr-only" />
            <div
              className={`p-3 rounded-xl ${
                sendOption === "send"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Send className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Yes, Send Quote</p>
              <p className="text-sm text-muted-foreground">
                Send to customer via email
              </p>
            </div>
          </Label>

          <Label
            htmlFor="send-no"
            className={`flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
              sendOption === "save"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/50"
            }`}
          >
            <RadioGroupItem value="save" id="send-no" className="sr-only" />
            <div
              className={`p-3 rounded-xl ${
                sendOption === "save"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <Save className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold text-foreground">
                No, Save for Later
              </p>
              <p className="text-sm text-muted-foreground">
                Save as draft to edit/send later
              </p>
            </div>
          </Label>
        </RadioGroup>
      </FormSection>

      {sendOption === "send" && (
        <FormSection title="Send immediately?" showDivider>
          <RadioGroup
            value={
              sendImmediately === null ? "" : sendImmediately ? "yes" : "no"
            }
            onValueChange={(value) => setSendImmediately(value === "yes")}
            className="grid md:grid-cols-2 gap-4 mb-6"
          >
            <Label
              htmlFor="immediate-yes"
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                sendImmediately === true
                  ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem
                value="yes"
                id="immediate-yes"
                className="sr-only"
              />
              <div
                className={`p-2.5 rounded-lg ${
                  sendImmediately === true
                    ? "bg-green-500 text-white"
                    : "bg-muted"
                }`}
              >
                <Check className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Yes, Send Now</p>
                <p className="text-sm text-muted-foreground">
                  Email will be sent immediately
                </p>
              </div>
            </Label>

            <Label
              htmlFor="immediate-no"
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                sendImmediately === false
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem
                value="no"
                id="immediate-no"
                className="sr-only"
              />
              <div
                className={`p-2.5 rounded-lg ${
                  sendImmediately === false
                    ? "bg-amber-500 text-white"
                    : "bg-muted"
                }`}
              >
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">No, Schedule</p>
                <p className="text-sm text-muted-foreground">
                  Send at a specific date/time
                </p>
              </div>
            </Label>
          </RadioGroup>

          {sendImmediately === false && (
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-xl mb-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Schedule Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Schedule Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  defaultValue={quoteData.customerEmail}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Personal Message (Optional)
              </Label>
              <Textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add a personal message to include in the email..."
                rows={3}
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-terms"
                  checked={includeTerms}
                  onCheckedChange={(checked) =>
                    setIncludeTerms(checked as boolean)
                  }
                />
                <Label
                  htmlFor="include-terms"
                  className="text-sm cursor-pointer"
                >
                  Include terms & conditions
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="include-pdf"
                  checked={includePdf}
                  onCheckedChange={(checked) =>
                    setIncludePdf(checked as boolean)
                  }
                />
                <Label htmlFor="include-pdf" className="text-sm cursor-pointer">
                  Attach PDF version of quote
                </Label>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            {sendImmediately === true && (
              <Button
                size="lg"
                className="gap-2"
                onClick={handleSendQuote}
                disabled={isSending}
              >
                {isSending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                {isSending ? "Sending..." : "Send Quote Now"}
              </Button>
            )}
            {sendImmediately === false && scheduleDate && scheduleTime && (
              <Button
                size="lg"
                className="gap-2"
                onClick={handleScheduleSend}
                disabled={isSending}
              >
                {isSending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Clock className="h-5 w-5" />
                )}
                {isSending ? "Scheduling..." : "Schedule Send"}
              </Button>
            )}
          </div>
        </FormSection>
      )}

      {sendOption === "save" && (
        <FormSection title="Save as Draft?" showDivider={false}>
          <RadioGroup
            value={saveAsDraft === null ? "" : saveAsDraft ? "yes" : "no"}
            onValueChange={(value) => setSaveAsDraft(value === "yes")}
            className="grid md:grid-cols-2 gap-4 mb-6"
          >
            <Label
              htmlFor="draft-yes"
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                saveAsDraft === true
                  ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem value="yes" id="draft-yes" className="sr-only" />
              <div
                className={`p-2.5 rounded-lg ${
                  saveAsDraft === true ? "bg-green-500 text-white" : "bg-muted"
                }`}
              >
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  Yes, Save as Draft
                </p>
                <p className="text-sm text-muted-foreground">
                  Save and sync to office system
                </p>
              </div>
            </Label>

            <Label
              htmlFor="draft-no"
              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                saveAsDraft === false
                  ? "border-amber-500 bg-amber-50 dark:bg-amber-950/30"
                  : "border-border hover:border-muted-foreground/50"
              }`}
            >
              <RadioGroupItem value="no" id="draft-no" className="sr-only" />
              <div
                className={`p-2.5 rounded-lg ${
                  saveAsDraft === false ? "bg-amber-500 text-white" : "bg-muted"
                }`}
              >
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-foreground">
                  No, Don&apos;t Save
                </p>
                <p className="text-sm text-muted-foreground">Discard changes</p>
              </div>
            </Label>
          </RadioGroup>

          {saveAsDraft === true && (
            <div className="p-4 bg-muted/50 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">
                    Draft will be saved with:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>All customer information and addresses</li>
                    <li>Room inventory and item details</li>
                    <li>Quote pricing and discounts</li>
                    <li>Notes and preferences</li>
                  </ul>
                  <p className="mt-2 text-muted-foreground">
                    You can access and edit this quote from your dashboard
                    anytime.
                  </p>
                </div>
              </div>
            </div>
          )}

          {saveAsDraft === false && (
            <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div className="text-sm text-red-700 dark:text-red-400">
                  <p className="font-medium">Are you sure?</p>
                  <p className="mt-1">
                    All entered information will be lost. You can still go back
                    and edit the quote before discarding.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            {saveAsDraft === true && (
              <Button
                size="lg"
                className="gap-2"
                onClick={handleSaveDraft}
                disabled={isSending}
              >
                {isSending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Save className="h-5 w-5" />
                )}
                {isSending ? "Saving..." : "Save Draft"}
              </Button>
            )}
            {saveAsDraft === false && (
              <Button size="lg" variant="destructive" className="gap-2">
                <AlertCircle className="h-5 w-5" />
                Discard Quote
              </Button>
            )}
          </div>
        </FormSection>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <DialogTitle className="text-center text-xl">
              {successType === "sent" && "Quote Sent Successfully!"}
              {successType === "saved" && "Quote Saved as Draft!"}
              {successType === "scheduled" && "Quote Scheduled!"}
            </DialogTitle>
            <DialogDescription className="text-center">
              {successType === "sent" && (
                <>
                  Your quote{" "}
                  <span className="font-mono font-semibold">
                    {quoteData.quoteNumber}
                  </span>{" "}
                  has been sent to{" "}
                  <span className="font-semibold">
                    {quoteData.customerEmail}
                  </span>
                </>
              )}
              {successType === "saved" && (
                <>
                  Your quote{" "}
                  <span className="font-mono font-semibold">
                    {quoteData.quoteNumber}
                  </span>{" "}
                  has been saved and synced to the office system.
                </>
              )}
              {successType === "scheduled" && (
                <>
                  Your quote will be sent on{" "}
                  <span className="font-semibold">
                    {scheduleDate} at {scheduleTime}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col gap-2 sm:flex-col">
            <Button
              className="w-full"
              onClick={() => setShowSuccessDialog(false)}
            >
              Create New Quote
            </Button>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setShowSuccessDialog(false)}
            >
              Go to Dashboard
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
