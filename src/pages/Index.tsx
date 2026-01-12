import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: 'Привет! Я локальная нейросеть. Могу помочь с кодом, 3D моделями, изображениями и многим другим. Что будем делать?' }
  ]);
  const [codeOutput, setCodeOutput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('python');

  const handleSend = () => {
    if (!input.trim()) return;

    if (activeTab === 'chat') {
      setChatHistory(prev => [
        ...prev,
        { role: 'user', content: input },
        { role: 'assistant', content: 'Обрабатываю запрос локально... (Демо-версия)' }
      ]);
    } else if (activeTab === 'code') {
      setCodeOutput(`# Сгенерированный ${selectedLanguage} код\n# По запросу: ${input}\n\ndef example_function():\n    print("Демо-версия генерации кода")\n    return True`);
    }

    setInput('');
  };

  const projects = [
    { id: 1, name: '3D Cube Animation', type: '3d', date: '2 часа назад' },
    { id: 2, name: 'API Parser Script', type: 'code', date: '5 часов назад' },
    { id: 3, name: 'Landscape Photo', type: 'image', date: 'вчера' },
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Icon name="Brain" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Local AI Studio</h1>
              <p className="text-sm text-muted-foreground">Локальная нейросеть для всего</p>
            </div>
          </div>
          <Badge variant="outline" className="gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Онлайн
          </Badge>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3 p-6 animate-fade-in">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="chat" className="gap-2">
                  <Icon name="MessageSquare" size={16} />
                  <span className="hidden sm:inline">Чат</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="gap-2">
                  <Icon name="Code" size={16} />
                  <span className="hidden sm:inline">Код</span>
                </TabsTrigger>
                <TabsTrigger value="3d" className="gap-2">
                  <Icon name="Box" size={16} />
                  <span className="hidden sm:inline">3D</span>
                </TabsTrigger>
                <TabsTrigger value="2d" className="gap-2">
                  <Icon name="Palette" size={16} />
                  <span className="hidden sm:inline">2D</span>
                </TabsTrigger>
                <TabsTrigger value="photo" className="gap-2">
                  <Icon name="Camera" size={16} />
                  <span className="hidden sm:inline">Фото</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Icon name="Settings" size={16} />
                  <span className="hidden sm:inline">Настройки</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                <ScrollArea className="h-[500px] rounded-lg border border-border bg-card/50 p-4">
                  <div className="space-y-4">
                    {chatHistory.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Icon name="Bot" size={18} className="text-primary" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-xl p-3 ${
                            msg.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                            <Icon name="User" size={18} className="text-secondary" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="code" className="space-y-4">
                <div className="flex gap-2 mb-4">
                  {['python', 'javascript', 'cpp'].map(lang => (
                    <Button
                      key={lang}
                      variant={selectedLanguage === lang ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedLanguage(lang)}
                      className="gap-2"
                    >
                      <Icon name="Code2" size={14} />
                      {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </Button>
                  ))}
                </div>
                <div className="h-[500px] rounded-lg border border-border bg-card/50 p-4 font-mono text-sm">
                  <pre className="text-muted-foreground whitespace-pre-wrap">{codeOutput || '// Код появится здесь после генерации'}</pre>
                </div>
              </TabsContent>

              <TabsContent value="3d" className="space-y-4">
                <div className="h-[500px] rounded-lg border border-border bg-card/50 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-primary/20 flex items-center justify-center">
                      <Icon name="Box" size={40} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">3D Модели</h3>
                      <p className="text-sm text-muted-foreground">Интеграция с Blender API</p>
                      <p className="text-xs text-muted-foreground mt-1">Опишите модель для создания</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="2d" className="space-y-4">
                <div className="h-[500px] rounded-lg border border-border bg-card/50 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary/20 flex items-center justify-center">
                      <Icon name="Palette" size={40} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">2D Графика</h3>
                      <p className="text-sm text-muted-foreground">Векторные и растровые изображения</p>
                      <p className="text-xs text-muted-foreground mt-1">Создание графических элементов</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="photo" className="space-y-4">
                <div className="h-[500px] rounded-lg border border-border bg-card/50 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-accent/20 flex items-center justify-center">
                      <Icon name="Camera" size={40} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Генерация Фото</h3>
                      <p className="text-sm text-muted-foreground">Реалистичные изображения</p>
                      <p className="text-xs text-muted-foreground mt-1">Опишите желаемую сцену</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="Cpu" size={16} />
                      Параметры модели
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 space-y-2">
                        <div className="text-xs text-muted-foreground">Температура</div>
                        <div className="text-2xl font-bold">0.7</div>
                      </Card>
                      <Card className="p-4 space-y-2">
                        <div className="text-xs text-muted-foreground">Макс. токены</div>
                        <div className="text-2xl font-bold">2048</div>
                      </Card>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold flex items-center gap-2">
                      <Icon name="HardDrive" size={16} />
                      Система
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 space-y-2">
                        <div className="text-xs text-muted-foreground">Использовано RAM</div>
                        <div className="text-2xl font-bold">4.2 GB</div>
                      </Card>
                      <Card className="p-4 space-y-2">
                        <div className="text-xs text-muted-foreground">Модели в кэше</div>
                        <div className="text-2xl font-bold">3</div>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 flex gap-3">
              <Textarea
                placeholder="Опишите что вам нужно..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="min-h-[100px] resize-none"
              />
              <Button
                onClick={handleSend}
                size="lg"
                className="px-8 gap-2"
              >
                <Icon name="Send" size={18} />
                Отправить
              </Button>
            </div>
          </Card>

          <div className="space-y-6 animate-fade-in">
            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="FolderOpen" size={18} />
                Проекты
              </h3>
              <div className="space-y-3">
                {projects.map(project => (
                  <div
                    key={project.id}
                    className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer hover-scale"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{project.name}</div>
                        <div className="text-xs text-muted-foreground">{project.date}</div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.type === '3d' && <Icon name="Box" size={12} className="mr-1" />}
                        {project.type === 'code' && <Icon name="Code" size={12} className="mr-1" />}
                        {project.type === 'image' && <Icon name="Image" size={12} className="mr-1" />}
                        {project.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 gap-2">
                <Icon name="Plus" size={16} />
                Новый проект
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Icon name="Zap" size={18} />
                Быстрые действия
              </h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                  <Icon name="FileCode" size={16} />
                  Анализ кода
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                  <Icon name="Sparkles" size={16} />
                  Оптимизация
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-2" size="sm">
                  <Icon name="Download" size={16} />
                  Экспорт
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
