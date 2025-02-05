"use client";

import { Button } from "@/components/tailwind/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailwind/ui/card";
import { Checkbox } from "@/components/tailwind/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/tailwind/ui/form";
import { Input } from "@/components/tailwind/ui/input";
import { Label } from "@/components/tailwind/ui/label";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { register } from "./actions";
import { type RegisterFormValues, registerSchema } from "./schema";

export function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      type: "",
      isCC: false,
      nif: 0,
      address: "",
      address2: "",
      postalCode: "",
      postalCodeDesc: "",
      district: "",
      phone: "",
      fax: "",
      mobile: "",
      saleConditions: "",
      visits: 0,
      seller: "",
      financial: "",
      plafond: "",
      isParent: false,
      parentClient: "",
      sellerDesc: "",
      sellerEmail: "",
      purchases: "",
      deliveryType: "",
      mandatoryRef: false,
      shippingMethod: "",
      image: "",
      priceType: 0,
      shipping: 0,
      rgpd: false,
      rgpdDate: "",
      mkt: false,
      mktEvents: false,
      mktServices: false,
      mktCampaigns: false,
      mktNewsletter: false,
      mktSurveys: false,
      active: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    execute({
      ...data,
      nif: data.nif?.toString(),
      priceType: data.priceType?.toString(),
      shipping: data.shipping?.toString(),
      mandatoryRef: data.mandatoryRef ? "true" : "false",
    });
  });

  const { execute, isPending } = useAction(register, {
    onSuccess() {
      router.push("/");
    },
    onError(error) {
      toast({
        title: "Erro",
        description: error.error.validationErrors?._errors?.[0],
        variant: "destructive",
      });
    },
  });

  return (
    <div className="w-full">
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-center">
          <CardTitle>
            <h1 className="text-2xl font-bold">Registo</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 p-6 md:p-8 gap-4">
          <Form {...form}>
            <form onSubmit={onSubmit}>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username">Utilizador</Label>
                      <FormControl>
                        <Input id="username" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          // required
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="name">Nome</Label>
                      <FormControl>
                        <Input id="name" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="email">Email</Label>
                      <FormControl>
                        <Input id="email" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="type">Tipo</Label>
                      <FormControl>
                        <Input id="type" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="isCC"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="isCC">CC</Label>
                      <FormControl>
                        <Checkbox id="isCC" checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="nif"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="nif">NIF</Label>
                      <FormControl>
                        <Input id="nif" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="address">Morada</Label>
                      <FormControl>
                        <Input id="address" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="address2"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="address2">Morada (linha 2)</Label>
                      <FormControl>
                        <Input id="address2" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="postalCode">Código Postal</Label>
                      <FormControl>
                        <Input id="postalCode" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="postalCodeDesc"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="postalCodeDesc">Localidade</Label>
                      <FormControl>
                        <Input id="postalCodeDesc" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="district">Distrito</Label>
                      <FormControl>
                        <Input id="district" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="phone">Telefone</Label>
                      <FormControl>
                        <Input id="phone" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mobile">Telemóvel</Label>
                      <FormControl>
                        <Input id="mobile" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="fax"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="fax">Fax</Label>
                      <FormControl>
                        <Input id="fax" type="tel" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="saleConditions"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="saleConditions">Condições de Venda</Label>
                      <FormControl>
                        <Input id="saleConditions" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="visits"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="visits">Visitas</Label>
                      <FormControl>
                        <Input id="visits" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="seller"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="seller">Vendedor</Label>
                      <FormControl>
                        <Input id="seller" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="financial"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="financial">Financeiro</Label>
                      <FormControl>
                        <Input id="financial" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="plafond"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="plafond">Plafond</Label>
                      <FormControl>
                        <Input id="plafond" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="isParent"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="isParent">É Cliente pai?</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="isParent-yes" />
                            <Label htmlFor="isParent-yes">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="isParent-no" />
                            <Label htmlFor="isParent-no">Não</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="parentClient"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="parentClient">Cliente Pai</Label>
                      <FormControl>
                        <Input id="parentClient" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="sellerDesc"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="sellerDesc">Descrição do Vendedor</Label>
                      <FormControl>
                        <Input id="sellerDesc" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="sellerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="sellerEmail">Email do Vendedor</Label>
                      <FormControl>
                        <Input id="sellerEmail" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="purchases"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="purchases">Compras</Label>
                      <FormControl>
                        <Input id="purchases" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="deliveryType"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="deliveryType">Tipo de Entrega</Label>
                      <FormControl>
                        <Input id="deliveryType" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mandatoryRef"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mandatoryRef">Referência Obrigatória</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mandatoryRef-yes" />
                            <Label htmlFor="mandatoryRef-yes">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mandatoryRef-no" />
                            <Label htmlFor="mandatoryRef-no">Não</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="shippingMethod"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="shippingMethod">Método de Envio</Label>
                      <FormControl>
                        <Input id="shippingMethod" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="image">Imagem</Label>
                      <FormControl>
                        <Input id="image" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="priceType"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="priceType">Tipo de Preço</Label>
                      <FormControl>
                        <Input id="priceType" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="shipping"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="shipping">Envio</Label>
                      <FormControl>
                        <Input id="shipping" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="rgpd"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="rgpd">RGPD</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="rgpd-yes" />
                            <Label htmlFor="rgpd-yes">Sim</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="rgpd-no" />
                            <Label htmlFor="rgpd-no">Não</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="rgpdDate"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="rgpdDate">Data RGPD</Label>
                      <FormControl>
                        <Input id="rgpdDate" type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mkt"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mkt">Marketing</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mkt-yes" />
                            <Label htmlFor="mkt-yes">Aceitou</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mkt-no" />
                            <Label htmlFor="mkt-no">Recusou</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mktEvents"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mktEvents">Eventos Marketing</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mktEvents-yes" />
                            <Label htmlFor="mktEvents-yes">Aceitou</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mktEvents-no" />
                            <Label htmlFor="mktEvents-no">Recusou</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mktServices"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mktServices">Serviços Marketing</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mktServices-yes" />
                            <Label htmlFor="mktServices-yes">Aceitou</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mktServices-no" />
                            <Label htmlFor="mktServices-no">Recusou</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mktCampaigns"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mktCampaigns">Campanhas Marketing</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mktCampaigns-yes" />
                            <Label htmlFor="mktCampaigns-yes">Aceitou</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mktCampaigns-no" />
                            <Label htmlFor="mktCampaigns-no">Recusou</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mktNewsletter"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mktNewsletter">Newsletter</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mktNewsletter-yes" />
                            <Label htmlFor="mktNewsletter-yes">Aceitou</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mktNewsletter-no" />
                            <Label htmlFor="mktNewsletter-no">Recusou</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="mktSurveys"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="mktSurveys">Inquéritos Marketing</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="mktSurveys-yes" />
                            <Label htmlFor="mktSurveys-yes">Aceitou</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="mktSurveys-no" />
                            <Label htmlFor="mkt-no">Recusou</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="active">Ativo</Label>
                      <FormControl>
                        <RadioGroup defaultValue="false" className="flex flex-row" onValueChange={field.onChange}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="true" id="active-yes" />
                            <Label htmlFor="active-yes">Ativo</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="false" id="active-no" />
                            <Label htmlFor="active-no">Inativo</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row justify-center pt-6">
                <Button className="w-44" type="submit" disabled={isPending}>
                  Registar
                  {isPending && <LoaderCircle className="w-4 h-4 animate-spin" />}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
